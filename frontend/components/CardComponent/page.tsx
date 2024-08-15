import { Card } from "antd";
import Link from "next/link";
const { Meta } = Card;

type CardComponentProps = {
    title: string;
    description: string;
    link: string;
    link_title: string;
};

export default function CardComponent({ title, description, link, link_title }: CardComponentProps) {
    return (
        <Card
            size="default"
            title={title}
            actions={[
                <Link href={link} key={link} className="text-blue-500">
                    {link_title}
                </Link>,
            ]}
            className="w-full"
        >
            <Meta description={description}/>
        </Card>
    );
}
