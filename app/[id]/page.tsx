
import { fetcher } from "@/lib/utils";
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {

    const res = await fetcher(`${process.env.BASE_URL}/api/${params.id}`, { next: { revalidate: 10 } });
    console.log('res', res)
    if (res === null) {
        // redirect to 404
        redirect('/');
    }

    return (
        <div className="z-10">
            <h1>Page: {params.id}</h1>
        </div>
    );
}