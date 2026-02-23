import Link from 'next/link'

export default function AdminPosts() {
    // In the future this will be dynamically populated from Firebase
    const mockPosts = [
        { id: '1', title: 'The Future of AI in Enterprise', status: 'published', author: 'Pedro Moneo', date: '2026-02-19', language: 'en' },
        { id: '2', title: 'Open Innovation Masterclass', status: 'draft', author: 'Opinno Team', date: '2026-02-18', language: 'es' },
        { id: '3', title: 'Digital Transformation in Banking', status: 'published', author: 'Pedro Moneo', date: '2026-02-15', language: 'en' },
    ]

    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Posts</h1>
                    <p className="text-gray-500 mt-1">Manage all blog posts, articles, and insights.</p>
                </div>
                <Link href="/admin/posts/new" className="px-5 py-2.5 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14" /></svg>
                    Create Post
                </Link>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="flex-1 rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent sm:text-sm"
                    />
                    <select className="rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent sm:text-sm">
                        <option>All Languages</option>
                        <option value="en">English (en)</option>
                        <option value="es">Spanish (es)</option>
                        <option value="it">Italian (it)</option>
                    </select>
                    <select className="rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent sm:text-sm">
                        <option>All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                    <div className="text-sm text-gray-500">/{post.language}/{post.title.toLowerCase().replace(/ /g, '-')}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 uppercase">
                                        {post.language}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {post.author}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {post.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href={`/admin/posts/${post.id}`} className="text-opinno-accent hover:text-opinno-accent-hover mr-4">Edit</a>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
