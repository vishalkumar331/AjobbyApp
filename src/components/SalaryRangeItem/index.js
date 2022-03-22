import './index.css'

const SalaryRangeItem = props => {
  const {salaryItemDetails, onUpdatingSalaryRange} = props
  const {salaryRangeId, label} = salaryItemDetails
  const onSelectingSalaryRange = () => {
    onUpdatingSalaryRange(salaryRangeId)
  }

  return (
    <li className="range_container">
      <input
        type="radio"
        id={salaryRangeId}
        className="range_input"
        name="salary"
        onClick={onSelectingSalaryRange}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId} className="range_label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
