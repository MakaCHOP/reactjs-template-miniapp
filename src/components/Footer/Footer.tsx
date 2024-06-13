import {Card, CardBody, Image} from "@nextui-org/react";
import {Navigate} from "react-router-dom";

export default function CardHolder() {
  const list = [
    {
      title: "Stats",
      img: "/images/menu/m1.png",
      link: "/stats",

    },
    {
      title: "Boosts",
      img: "/images/menu/m2.png",
      link: "/boosts",

    },
    {
      title: "Tap",
      img: "/images/menu/m3.png",
      link: "/",

    },
    {
      title: "Tasks",
      img: "/images/menu/m4.png",
      link: "/tasks",

    },
    {
      title: "Referral",
      img: "/images/menu/m5.png",
      link: "/referrals",
    },
  ];

  return (
      <div className="gap-2 grid grid-cols-5 xs:px-8 px-3">
        {list.map((item, index) => (
            <Card className={"bg-transparent border border-r-2"} shadow="lg" key={index} isPressable onPress={() => <Navigate to={item.link}/>}>
              <CardBody className="bg-transparent px-2 gap-2">
                <Image
                    alt={item.title}
                    className="object-cover"
                    src={item.img}
                />
                <p className={"text-[0.6rem] text-secondary-100 text-center"}>
                  {item.title}

                </p>
              </CardBody>
            </Card>
        ))}
      </div>
  );
}