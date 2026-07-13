import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import prisma from '@/lib/prismadb';

type Props = {
    params: Promise<{ linkCode: string }>
}

function extractHostIfValidURL(str: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(str)) {
        const url = new URL(str);
        return url.host;
    }
    return str;
}

export default async function LinkDetail({ params }: Props) {
    const { linkCode } = await params;
    const hdrs = await headers();

    const link = await prisma.link.findFirst({ where: { short: linkCode } });

    if (!link) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p>Link not found</p>
            </div>
        );
    }

    const referrer = extractHostIfValidURL(
        hdrs.get('referer') || 'Direct'
    );

    const ipAddress = hdrs.get('x-forwarded-for');

    const ua = userAgent({ headers: hdrs });

    try {
        await prisma.click.create({
            data: {
                linkId: link.id,
                ipAddress,
                referrer,
                device: ua.device.type || 'desktop',
                os: ua.os.name || 'unknown',
                browser: ua.browser.name || 'unknown',
            },
        });
    } catch {
        // Click logging failure shouldn't block the redirect
    }

    redirect(link.original);
}
