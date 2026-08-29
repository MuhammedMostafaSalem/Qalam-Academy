import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getBlogByIdAction } from "@/actions/blogActions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export default async function BlogDetailsPage({ params }) {
    const { slug } = await params;
    const result = await getBlogByIdAction(slug);

    if (!result.success || !result.data || !result.data.isPublished) notFound();

    const blog = result.data;
    const image = blog.featuredImage
        ? (blog.featuredImage.startsWith("http") ? blog.featuredImage : `${BASE_URL}${blog.featuredImage}`)
        : null;

    return (
        <article className="pb-24 pt-36">
            <Container>
                <div className="mx-auto max-w-4xl">
                    {blog.category?.title && <p className="text-primary">{blog.category.title}</p>}
                    <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{blog.title}</h1>
                    {blog.excerpt && <p className="mt-6 text-lg leading-8 text-text-secondary">{blog.excerpt}</p>}
                    {image && (
                        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl">
                            <Image src={image} alt={blog.title} fill priority unoptimized className="object-cover" />
                        </div>
                    )}
                    <div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-text-secondary">{blog.content}</div>
                </div>
            </Container>
        </article>
    );
}
