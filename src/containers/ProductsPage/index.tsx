import React, {
  useState,
  useEffect,
  ReactComponentElement,
  SyntheticEvent,
} from "react";
import Products from "./components/Products";
import Search from "../../componentsCommon/Search";
import FailurePage from "../../componentsCommon/FailurePage";
import Loader from "../../componentsCommon/Loader";
import NoResults from "../../componentsCommon/NoResults";
import { Product } from "./components/Products";
import styles from "./components/Products/products.module.scss";

interface AbortController {
  signal: AbortSignal;
  abort: () => void;
}

interface Response {
  json: () => Promise<SearchApiData>;
}

interface AbortSignal {
  aborted: boolean;
  onabort: any;
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
  const [isGetApiDataFailed, setIsGetApiDataFailed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParam>({
    searchText: "",
    page: 0,
    totalCount: 0,
  });
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  let timeout: ReturnType<typeof setTimeout>;

  /* useEffect(() => {

  }, []) */

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
    setIsGetApiDataFailed(false);
    fetch("https://latency-dsn.algolia.net/1/indexes/*/queries", {
      signal: controller.signal as any,
      method: "POST",
      headers: {
        "x-algolia-api-key": process.env.REACT_APP_API_KEY as string,
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
        clearTimeout(timeout);
      })
      .catch((e: { name: string }) => {
        console.warn(e);
        setIsSearchRequestFired(false);

        if (e.name !== "AbortError") {
          setIsGetApiDataFailed(true);
        }
        clearTimeout(timeout);
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
    if (timeout) {
      clearTimeout(timeout);
    }
    // when search text empty, reset data
    if (!searchText.length) {
      setApiData(null);
      return;
    }
    // set new request timeout
    timeout = setTimeout(() => {
      getApiData(searchText);
      setApiData(null);
      setIsSearchRequestFired(true);
    }, 1000);
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
