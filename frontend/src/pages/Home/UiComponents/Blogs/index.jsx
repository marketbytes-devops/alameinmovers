import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TitleDescription from "../../../../components/TitleDescription";
import { useNavigate, Link } from "react-router-dom";
import { data } from "../../../../assets/data/blogData";
import Button from "../../../../components/Button";

const BlogSection = () => {
  const navigate = useNavigate();
  const latestBlogs = data.blogLists.slice(0, 4);

  return (
    <div className="bg-white">
      <div className="mx-auto">
        <div className="flex justify-center lg:justify-between items-center mb-6">
          <TitleDescription
            title="Latest News and Articles"
            titleClass="text-3xl text-black mb-2"
          />
          <Button
            label="View all"
            icon="ArrowUpRight"
            className="mt-6 md:mt-0 bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
            onClick={() => navigate("/blog")}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
         
          <div className="w-full md:w-1/2 flex flex-col">
            <Link to={`/blog/${latestBlogs[0].id}`}>
              <div>
                <img
                  src={latestBlogs[0].image}
                  alt={latestBlogs[0].title}
                  className="object-cover w-full h-60 rounded-2xl mb-4"
                />
                <p className="text-2xl font-medium text-black mb-2">
                  {latestBlogs[0].title}
                </p>
                <p className="text-gray-600">{latestBlogs[0].highlight}</p>
                <p className="text-gray-600 font-medium pt-2">
                  {latestBlogs[0].date}
                </p>
              </div>
            </Link>
          </div>

         
          <div className="w-full md:w-1/2 flex flex-col">
            {latestBlogs.slice(1, 4).map((blog, index) => (
              <Link to={`/blog/${blog.id}`} key={index}>
                <div className="rounded-xl flex flex-col sm:flex-row items-center mb-8">
                  <div className="w-full sm:w-1/3 sm:mr-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <h3 className="text-lg text-secondary mt-[-8]">
                      {blog.detail.content[0].type === "text" ? "Article" : "News"}
                    </h3>
                    <p className="text-black text-md font-semibold mb-2">
                      {blog.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="-mt-6 sm:-mt-6 md:mt-0 lg:mt-0 xl:mt-0 lg:hidden flex items-center justify-center">
          <Button
            label="View all"
            icon="ArrowUpRight"
            className="mt-6 md:mt-0 bg-secondary text-black rounded-2xl px-4 py-2 text-base hover:bg-white hover:text-gray-900 transition-colors duration-300 ripple-button"
            onClick={() => navigate("/blog")}
          />
      </div>
    </div>
  );
};

export default BlogSection;