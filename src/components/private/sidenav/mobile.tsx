import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import SideNavContent from './content'
import { useState } from 'react'

export const MobileSideNav = () => {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline px-2 md:hidden">
          <MenuIcon size={30} strokeWidth={2} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex h-full w-[300px] flex-col">
        <SideNavContent setState={setOpen} />
      </SheetContent>
    </Sheet>
  )
}
