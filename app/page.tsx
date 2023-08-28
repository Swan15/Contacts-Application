import { contact } from "@/types"
import ContactsView from "./contacts"

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = res.ok ? (await res.json() as contact[]).sort((a, b) => {
    // sort by last name
    const aName = a.name.split(' ')
    const bName = b.name.split(' ')
    return aName[aName.length - 1].localeCompare(bName[bName.length - 1])
  }) : []
  
  return (
    <main className="overflow-hidden bg-[#CACCE]">
      {
        data.length > 0 ? (
          <ContactsView contacts={data}/>
        ) : (
          <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-2xl font-bold">No data found</h1>
            <p>Please check your internet connection and try again later.</p>
          </div>
        )
      }
    </main>
  )
}
