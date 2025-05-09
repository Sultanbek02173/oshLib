import "./projectPage.scss"
import { ProjectBanner, MainProjects } from '../../widgets'

export const ProjectPage = () => {
  return (
    <div className='container'>
      <ProjectBanner />
      <MainProjects />
    </div>
  )
}
