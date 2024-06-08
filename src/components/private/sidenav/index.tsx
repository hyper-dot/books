import SideNavContent from './content'

const SideNav = () => {
  return (
    <div className="sticky inset-0 hidden h-full min-h-screen bg-secondary px-2 pt-2 md:flex md:min-w-[250px] md:flex-col">
      <SideNavContent />
    </div>
  )
}

export default SideNav
