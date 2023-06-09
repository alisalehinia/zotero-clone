import axios from "axios"
import PostList from "@/components/posts/Postlist";
import SortBar from "@/components/posts/SortBar";
import MobileCategory from "@/components/posts/MobileCategory";
import DesktopCategory from "@/components/posts/DesktopCategory";
import queryString from 'query-string';
import Layout from "@/containers/Layout";
export default function CategorySlug({ blogsData, postCategories }) {

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
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context) {
    const { query, req } = context;
    const { data: result } = await axios.get(`http://localhost:5000/api/posts?${queryString.stringify(query)}`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie || "",
        }
    });
    const { data } = result
    const { data: postCategories } = await axios.get("http://localhost:5000/api/post-category");
    return {
        props: {
            blogsData: data,
            postCategories: postCategories.data
        }
    }

}