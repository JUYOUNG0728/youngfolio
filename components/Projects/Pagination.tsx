import ReactPagination from "react-js-pagination";

type PaginationProps = {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  handlePageChange: (pageNumber: number) => void;
};

export default function Pagination({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  handlePageChange,
}: PaginationProps) {
  return (
    <ReactPagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
      innerClass="flex gap-2"
      itemClass="px-4 py-2 text-white border border-gray-40 rounded-full cursor-pointer"
      activeClass="bg-white text-black"
      nextPageText="›"
      prevPageText="‹"
      hideFirstLastPages
    />
  );
}
