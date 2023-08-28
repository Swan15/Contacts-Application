export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = res.ok ? await res.json() : []


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        data.length > 0 ? (
          <></>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800">No data found</h1>
            <p className="text-gray-500">Please check your internet connection and try again later.</p>
          </div>
        )
      }
    </main>
  )
}
