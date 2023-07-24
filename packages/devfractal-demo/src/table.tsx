export const Table = () => {
  return (
    <div className="m-4">
      <div className="table w-full">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell text-left">Song</div>
            <div className="table-cell text-left">Artist</div>
            <div className="table-cell text-left">Year</div>
          </div>
        </div>
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </div>
            <div className="table-cell">Malcolm Lockyer</div>
            <div className="table-cell">1961</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Witchy Woman</div>
            <div className="table-cell">The Eagles</div>
            <div className="table-cell">1972</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Shining Star</div>
            <div className="table-cell">Earth, Wind, and Fire</div>
            <div className="table-cell">1975</div>
          </div>
        </div>
      </div>
    </div>
  )
}
