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
      containerClassName="flex justify-center items-center gap-3 mt-10 font-sans"

      // ✅ Page wrapper
      pageClassName="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 shadow-sm transition"

      // ✅ Page link clickable
      pageLinkClassName="w-full h-full flex items-center justify-center rounded-full cursor-pointer hover:bg-[#365a41]/10 hover:text-[white] transition"

      // ✅ Active page
      activeClassName="bg-gradient-to-r from-[#4e47af] to-[#351466] text-white font-semibold shadow-md border-none"

      // ✅ Prev/Next
      previousClassName="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-[white]/10 hover:text-[white] cursor-pointer transition"
      previousLinkClassName="flex items-center justify-center"
      nextClassName="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-[white]/10 hover:text-[white] cursor-pointer transition"
      nextLinkClassName="flex items-center justify-center"

      // ✅ Ellipsis
      breakClassName="px-2 text-gray-500 select-none"

      // ✅ Disabled state
      disabledClassName="opacity-40 cursor-not-allowed"
    />
  );
}
