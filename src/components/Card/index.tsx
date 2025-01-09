import { Button } from "@mui/material";
import { FC } from "react";
import { CardHomeProps } from "../../types/homeCard";
import { LazyLoadImage } from "react-lazy-load-image-component";



const CardHome: FC<CardHomeProps> = ({items}) => {
 
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-16 pb-0 md:px-36  justify-items-center ">
      {items.map((item, index) => (
          <div className="max-w-sm bg-[#111418] border rounded-lg shadow border-zinc-800 hover:border-zinc-700 mb-10 transform hover:scale-105 transition-transform duration-300 ease-in-out " key={index}>
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
                  <LazyLoadImage src={item.imgCard} alt="imgCard" className="object-contain h-full w-full"  />
               </div>
              <div className="p-5 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{item.title}</h5>
                  <p className="mb-3 font-normal text-gray-400">{item.description}</p>
                  <div className="flex justify-between">
                  <Button variant="contained" sx={{
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: '500',
                    backgroundColor: '#0091ea',
                    textTransform: "none",
                    color: '#ffffff',
                    "&:hover": { backgroundColor: "#01579b" },
                  }}
                  href={item.obtainLink}
                  >
                  Obtener
                    </Button>
                    </div>
              </div>
          </div>

      ))}
         </div>
  );
};

export default CardHome;
