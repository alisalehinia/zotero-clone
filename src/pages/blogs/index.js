import axios from "axios"
import PostList from "@/components/posts/Postlist";
import SortBar from "@/components/posts/SortBar";
import MobileCategory from "@/components/posts/MobileCategory";
import DesktopCategory from "@/components/posts/DesktopCategory";
import Layout from "@/containers/Layout";
import queryString from "query-string"
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import RouterPush from "@/utils/RouterPush";
export default function Blogs({ blogsData, postCategories }) {

  const router = useRouter();

  const pageHandler = (e, page) => {
    router.query.page = page;
    RouterPush(router)
  }
  return (
    <Layout>
      <div>
        <div className="container mx-auto lg:max-w-screen-xl px-4 md:p-0 py-1">
          <div className="grid md:grid-cols-12 md:grid-rows-[60px_minmax(60px,_1fr)] gap-6 ">

            <div className="hidden md:block md:col-span-3 md:row-span-2 ">
              <DesktopCategory postCategories={postCategories} />
            </div>

            <div className="flex items-center gap-x-2 md:hidden overflow-auto pb-4">
              <MobileCategory postCategories={postCategories} />
            </div>
            <div className="hidden md:block md:col-span-9 ">
              <SortBar />
            </div>
            <div className="md:col-span-9 grid grid-cols-6 gap-4 bg-gray-100">
              <PostList blogsData={blogsData.docs} />
              <div className="col-span-6 flex items-center justify-center" dir="ltr" >
                <Pagination count={blogsData.totalPages} color="secondary" page={blogsData.page} onChange={pageHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export async function getServerSideProps({ req, query }) {

  const { data: result } = await axios.get(`http://localhost:5000/api/posts?${queryString.stringify(query)}`, {
    withCredentials: true,
    headers: {
      origin: 'localhost',
      Cookie: req.headers.cookie || "",
    }
  });
  console.log(req.headers.cookies);
  const { data } = result
  const { data: postCategories } = await axios.get("http://localhost:5000/api/post-category");
  return {
    props: {
      blogsData: data,
      postCategories: postCategories.data
    }
  }

}