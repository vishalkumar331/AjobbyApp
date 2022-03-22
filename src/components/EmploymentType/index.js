import './index.css'

const EmploymentType = props => {
  const {employmentType, onUpdatingEmploymentType} = props
  const {label, employmentTypeId} = employmentType

  const onSelectingEmploymentType = event => {
    const isChecked = event.target.checked

    onUpdatingEmploymentType(isChecked, employmentTypeId)
  }

  return (
    <li className="employment_type">
      <input
        type="checkbox"
        id={employmentTypeId}
        className="employment_type_checkbox"
        name="employmentType"
        value={employmentTypeId}
        onClick={onSelectingEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="employment_type_label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
