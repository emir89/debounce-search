import React, { useState, useRef } from "react";
import Products from "./components/Products";
import Search from "../../componentsCommon/Search";
import FailurePage from "../../componentsCommon/FailurePage";
import Loader from "../../componentsCommon/Loader";
import NoResults from "../../componentsCommon/NoResults";
import { Product } from "./components/Products";
import styles from "./components/Products/products.module.scss";

interface AbortController {
  signal: AbortSignal;
  abort: Function;
}

interface Response {
  json: Function;
}

interface AbortSignal {
  aborted: boolean;
  onabort: null | Function;
}

interface SearchParam {
  searchText: string;
  page: number;
  totalCount: number;
}

interface SearchNode {
  hits: Product[];
  page: number;
  nbHits: number;
}

interface SearchApiData {
  results: SearchNode[];
}

const ProductsPage: React.FC = () => {
  // set initial state
  const [apiData, setApiData] = useState<Product[] | null>(null);
  const [isSearchRequestFired, setIsSearchRequestFired] =
    useState<Boolean>(false);
  const [isGetApiDataFailed, setIsGetApiDataFailed] = useState<Boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParam>({
    searchText: "",
    page: 0,
    totalCount: 0,
  });
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  // set request controller ref
  //const controller = useRef<AbortController>(new AbortController());

  // set timeout ref
  const timeout = useRef<any>(null);

  /**
   * Gets api data
   *
   * @param queryParam
   * @param page
   * @param isLoadMore
   */
  function getApiData(
    queryParam: string,
    page: number = 0,
    isLoadMore: boolean = false
  ): void {
    fetch("https://latency-dsn.algolia.net/1/indexes/*/queries", {
      signal: controller.signal as any,
      method: "POST",
      headers: {
        "x-algolia-api-key": "6be0576ff61c053d5f9a3225e2a90f76",
        "x-algolia-application-id": "latency",
      },
      body: JSON.stringify({
        requests: [
          {
            indexName: "ikea",
            params: `query=${queryParam}&hitsPerPage=16&page=${page}`,
          },
        ],
      }),
    })
      .then((response: Response) => response.json())
      .then((data: SearchApiData) => {
        if (isLoadMore) {
          setApiData((prevApiData) => {
            return [...(prevApiData as Product[]), ...data.results[0].hits];
          });
        } else {
          setApiData(data.results[0].hits);
        }
        setIsSearchRequestFired(false);
        setSearchParams({
          searchText: queryParam,
          page,
          totalCount: data.results[0].nbHits,
        });
        clearTimeout(timeout.current);
      })
      .catch((e: any) => {
        console.warn(e);
        setIsSearchRequestFired(false);

        if (e.name !== "AbortError") {
          setIsGetApiDataFailed(true);
        }
        clearTimeout(timeout.current);
      });
  }

  /**
   * Handles load more
   */
  function handleLoadMore(): void {
    const page = searchParams.page + 1;
    setIsSearchRequestFired(true);
    getApiData(searchParams.searchText, page, true);
  }

  /**
   * Handles search
   *
   * @param searchText
   */
  function handleSearch(searchText: string): void {
    // handle request abortion
    if (isSearchRequestFired && !apiData) {
      setIsSearchRequestFired(false);
      controller.abort();
      setController(new AbortController());
    }
    // clear existing request timeout
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    // when search text empty, reset data
    if (!searchText.length) {
      setApiData(null);
      return;
    }
    // set new request timeout
    timeout.current = setTimeout(() => {
      getApiData(searchText);
      setApiData(null);
      setIsSearchRequestFired(true);
    }, 200);
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className={styles.ProductsContainer}>
        {isGetApiDataFailed && <FailurePage />}
        {!isSearchRequestFired && !apiData && !isGetApiDataFailed && (
          <NoResults />
        )}
        {isSearchRequestFired && searchParams.page === 0 && <Loader />}
        {apiData && (
          <Products
            products={apiData}
            onLoadMore={handleLoadMore}
            hasMoreData={searchParams.totalCount !== apiData.length}
            isSearchRequestInProgress={isSearchRequestFired}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
