import Skeleton from 'react-loading-skeleton'

export function CardSkeleton() {
  return (
    <div>
      <a>
        <span>
          <span>
            <Skeleton style={{ maxWidth: '50px' }} />
          </span>

          <div>
            <Skeleton height={62} width={72} style={{ margin: '2px 0 7px' }} />
          </div>

          <h2>
            <Skeleton />
            <span className="sr-only">Loading</span>
          </h2>
        </span>
      </a>
    </div>
  )
}
