import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function GuestLayout({ children, variant = 'default' }) {
    const isHome = variant === 'home';

    return (
        <div className="flex min-h-screen flex-col bg-[#f3f3dc] text-slate-900">
            <Navbar />

            <main className="flex-1">
                {isHome ? (
                    children
                ) : (
                    <div className="px-6 pt-32 pb-16 sm:px-8 lg:px-10">
                        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
                            {children}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
