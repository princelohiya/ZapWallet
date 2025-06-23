import { nativeEnum } from "zod";

export const Appbar = (props) => {
  const name = props.name;
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className="flex flex-col justify-center h-full ml-4 w-26"><img src="https://videos.openai.com/vg-assets/assets%2Ftask_01jxyqq60qebqbrc8g52bx3w03%2F1750156998_img_0.webp?st=2025-06-17T09%3A43%3A39Z&se=2025-06-23T10%3A43%3A39Z&sks=b&skt=2025-06-17T09%3A43%3A39Z&ske=2025-06-23T10%3A43%3A39Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ixc1FxY4O1SbHVSUjz23VnYQAvqe%2B3b%2BzHh%2B178lAW4%3D&az=oaivgprodscus" alt="" /> </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 text text-slate-600">{name}</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-orange-600">{name[0].toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};
