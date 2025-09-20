import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount, currentPage, onPageChange }) {
  return (
    <ReactPaginate
  breakLabel="..."
  nextLabel="→"
  previousLabel="←"
  pageRangeDisplayed={2}
  marginPagesDisplayed={1}
  pageCount={pageCount}
  forcePage={currentPage - 1}
  onPageChange={(selected) => onPageChange(selected.selected + 1)}
  containerClassName="flex justify-center items-center gap-2 mt-8"
  
  // ✅ Page wrapper
  pageClassName="w-8 h-8 flex items-center justify-center rounded-full border"
  
  // ✅ Make whole circle clickable
  pageLinkClassName="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
  
  // ✅ Active page
  activeClassName="border-[#365a41] text-[#365a41] font-bold"
  
  // ✅ Prev/Next
  previousClassName="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 cursor-pointer"
  previousLinkClassName="w-full h-full flex items-center justify-center"
  nextClassName="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 cursor-pointer"
  nextLinkClassName="w-full h-full flex items-center justify-center"
  
  // ✅ Ellipsis
  breakClassName="px-2 text-gray-500"
  breakLinkClassName="cursor-default"
  
  // ✅ Disabled
  disabledClassName="opacity-50 cursor-not-allowed"
/>

  );
}
