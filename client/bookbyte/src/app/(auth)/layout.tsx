import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BookByte",
    description: "Sua rede social de livros!",
};

function AuthPage({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[url('https://png.pngtree.com/background/20230527/original/pngtree-an-old-bookcase-in-a-library-picture-image_2760144.jpg')] bg-no-repeat bg-cover flex min-h-screen flex-col items-center justify-center"> 
            <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11 text-gray-600 w-1/3">
            {children} </form>
            </main>
    );
  }
  
  export default AuthPage;