import { FC, useEffect, useMemo, useState } from "react";
import { CommonProps } from "@/components/DataTable/types";
import { Nullable } from "@/utils/types";
import Loader from "@/components/Loader";
import cx from "classnames";
import { getHideableClasses } from "@/components/DataTable/utils";

const getFromTo = (index: number, itemsPerPage: number) => {
  const from = index === 0 ? 0 : index * itemsPerPage;
  const to = index === 0 ? itemsPerPage : (index + 1) * itemsPerPage;

  return { from, to };
};

const KeepData: FC<
  CommonProps & {
    lastPageReached: boolean;
    onNext: (currentIndex: number) => Promise<void>;
  }
> = ({ tabs, rows: _rows, itemsPerPage, lastPageReached, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState<Nullable<number>>(!itemsPerPage ? 0 : null);
  const [rows, setRows] = useState(_rows);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updatedRows = _rows.filter(({ id }) => !rows.find((row) => row.id === id));

    if (updatedRows.length) {
      setRows((current) => [...current, ...updatedRows]);
    }
  }, [_rows, rows]);

  useEffect(() => {
    if (!lastIndex && lastPageReached) {
      setLastIndex(currentIndex);
    }
  }, [lastPageReached, lastIndex, currentIndex]);

  const displayRows = useMemo(() => {
    if (!itemsPerPage) return rows;

    const { from, to } = getFromTo(currentIndex, itemsPerPage);

    return rows.slice(from, to);
  }, [rows, itemsPerPage, currentIndex]);

  const isFirstPage = currentIndex === 0;
  const isLastPage = lastIndex === currentIndex;

  const handlePrevClick = () => {
    if (isFirstPage) return;

    setCurrentIndex((current) => current - 1);
  };

  const handleNextClick = async () => {
    if (isLastPage) return;

    const nextIndex = currentIndex + 1;
    const { from, to } = getFromTo(nextIndex, itemsPerPage);

    if (lastIndex !== null || rows.slice(from, to).length) {
      setCurrentIndex(nextIndex);

      return;
    }

    setIsLoading(true);
    await onNext(currentIndex);
    setIsLoading(false);
    setCurrentIndex(nextIndex);
  };

  return (
    <section className="w-full">
      <div className="py-8">
        <div className="mt-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            {isLoading ? (
              <div className="mx-auto flex w-full justify-center bg-white dark:bg-gray-800">
                <Loader />
              </div>
            ) : (
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tabs.map(({ content, ...hidedSizes }) => (
                      <th
                        key={content}
                        scope="col"
                        className={cx(
                          "border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
                          getHideableClasses(hidedSizes)
                        )}
                      >
                        {content}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    displayRows.map(({ id, cells }) => (
                      <tr key={id}>
                        {cells.map(({ id, content, ...hidedSizes }) => (
                          <td
                            key={id}
                            className={cx(
                              "border-b border-gray-200 bg-white px-5 py-5 text-sm dark:border-gray-700 dark:bg-gray-800",
                              getHideableClasses(hidedSizes)
                            )}
                          >
                            {typeof content === "string" ? (
                              <p className="text-xm text-gray-900 dark:text-gray-400">{content}</p>
                            ) : (
                              content
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            <div className="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-5 dark:bg-gray-800">
              <div className="flex items-center">
                <button
                  onClick={handlePrevClick}
                  type="button"
                  disabled={isFirstPage || isLoading}
                  className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  disabled={isLastPage || isLoading}
                  className="w-full rounded-r-xl border-b border-r border-t bg-white p-4 text-base text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={handleNextClick}
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeepData;
