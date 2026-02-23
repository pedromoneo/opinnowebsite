export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-8 text-opinno-primary">
            <header>
                <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Manage content across main, english, spanish and italian regional sites.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px]">
                    <span className="text-4xl font-bold font-display text-opinno-accent mb-2">1,248</span>
                    <span className="text-gray-500 font-medium uppercase tracking-widest text-sm">Published Pages</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px]">
                    <span className="text-4xl font-bold font-display text-opinno-primary mb-2">342</span>
                    <span className="text-gray-500 font-medium uppercase tracking-widest text-sm">Success Cases</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:bg-opinno-primary hover:text-white transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-opinno-accent group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-opinno-accent transition-colors" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14" /></svg>
                    </div>
                    <span className="font-bold tracking-wide">Create Content</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold font-display m-0">Recent Activity</h2>
                    <button className="text-sm text-opinno-accent font-medium hover:underline">View All</button>
                </div>
                <div className="p-0">
                    {/* Mock Activity List */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex flex-col">
                                <span className="font-medium text-[#1F2A38]">Updated Case Study: Project Alpha</span>
                                <span className="text-sm text-gray-400 mt-1">Edited by admin • 2 hours ago</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-600">PUBLISHED</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
