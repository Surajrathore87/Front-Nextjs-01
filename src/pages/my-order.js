import Dynamic from "next/dynamic";

const MyOrder = Dynamic(import('../components/Orders/MyOrder'))
const Layout = Dynamic(import('../components/Layouts/Layout'))


function DefaultPage() {
  return <>
    <Layout>
      <MyOrder />
    </Layout>
  </>;
}

export default DefaultPage;
