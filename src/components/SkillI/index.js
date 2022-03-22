import './index.css'

const Skill = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="jobItemDetails_skill">
      <img src={imageUrl} className="jobItemDetails_skill_icon" alt={name} />
      <p className="jobItemDetails_skill_name">{name}</p>
    </li>
  )
}

export default Skill
