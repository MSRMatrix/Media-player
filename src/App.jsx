import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppShell from "./layout/AppShell"

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <AppShell />,
      children: [
        {

        },

        {

        },
        {

        },
      ]
    },
    {
      path: "*",
      element: <AppShell />
    },
  ])


  return (
    <>
   <RouterProvider router={router} />
    </>
  )
}

export default App
