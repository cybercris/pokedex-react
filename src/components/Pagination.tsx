interface PaginationProps {
  totalCountOfRegister?: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => from + index + 1)
}

export function Pagination({
  totalCountOfRegister,
  registersPerPage = 60,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage =
    totalCountOfRegister && Math.floor(totalCountOfRegister / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    lastPage && currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <nav className="flex justify-center mt-6">
      <ol className="flex items-center content-center">
        {currentPage > siblingsCount + 1 && (
          <>
            <li className="flex items-center justify-center w-8 h-8">
              <button
                className="w-6 h-6 block text-center"
                type="button"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>

            {currentPage > 2 + siblingsCount && (
              <li className="flex items-center justify-center w-8 h-8">
                <span className="w-6 h-6 block text-center">...</span>
              </li>
            )}
          </>
        )}

        {previousPages.length
          ? previousPages.map((page) => (
              <li
                className="flex items-center justify-center w-8 h-8"
                key={page}
              >
                <button
                  className="w-6 h-6 block text-center"
                  type="button"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))
          : ''}

        <li className="flex items-center justify-center w-8 h-8">
          <button
            className="w-6 h-6 block text-center"
            type="button"
            onClick={() => onPageChange(currentPage)}
          >
            {currentPage}
          </button>
        </li>

        {nextPages.length
          ? nextPages.map((page) => (
              <li
                className="flex items-center justify-center w-8 h-8"
                key={page}
              >
                <button
                  className="w-6 h-6 block text-center"
                  type="button"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))
          : ''}

        {lastPage && currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <li className="flex items-center justify-center w-8 h-8">
                <span className="w-6 h-6 block text-center">...</span>
              </li>
            )}

            <li className="flex items-center justify-center w-8 h-8">
              <button
                className="w-6 h-6 block text-center"
                type="button"
                onClick={() => onPageChange(lastPage)}
              >
                {lastPage}
              </button>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
