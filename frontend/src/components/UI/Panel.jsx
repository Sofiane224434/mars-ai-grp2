import panelIconAssign1 from "../../assets/icons/panel_icon_assign1.png";
import panelIconAssign2 from "../../assets/icons/panel_icon_assign2.png";
import panelIconHome from "../../assets/icons/panel_icon_home.png";
import panelIconSetting from "../../assets/icons/panel_icon_setting.png";

export const PropertyPanel = () => {
  return (
    <div className="relative w-[294px] h-[1024px]">
      <div className="absolute w-[89.46%] h-full top-0 left-0 bg-[#1d1d24]" />

      <div className="absolute top-2.5 left-4 w-[226px] h-[100px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-white text-2xl text-center tracking-[0] leading-[normal]">
        PANEL D&apos;ADMINISTRATION
      </div>

      <div className="absolute top-[370px] left-8 w-52 h-[42px]">
        <div className="w-[206px] h-[42px] bg-[#42cbe6] flex flex-wrap items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0">
          <div className="relative w-9 h-9" />

          <div className="relative flex items-center justify-center w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            VOIR TOP50
          </div>
        </div>

        <div className="absolute top-[5px] left-[15px] w-8 h-8 flex items-center justify-center [font-family:'Jost-Black',Helvetica] font-black text-black text-xl text-center tracking-[0] leading-[normal]">
          50
        </div>
      </div>

      <div className="absolute top-[169px] left-[30px] w-52 h-[54px]">
        <div className="w-52 h-[54px] bg-[#42cbe6] flex flex-wrap items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0">
          <div className="relative w-9 h-9" />

          <div className="mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal relative w-fit text-white text-xl text-center tracking-[0] leading-[normal]">
            ASSIGNER <br />
            DES VIDEOS
          </div>
        </div>

        <div className="absolute top-[27px] left-6 w-[21px] h-4 flex">
          <img
            className="flex-1 w-[19.97px]"
            alt="Icon"
            src={panelIconAssign1}
          />
        </div>

        <div className="absolute top-[9px] left-6 w-[21px] h-3.5 flex">
          <img
            className="flex-1 w-[19.97px]"
            alt="Icon"
            src={panelIconAssign2}
          />
        </div>
      </div>

      <div className="absolute top-[429px] left-8 w-[206px] h-[54px]">
        <div className="flex flex-wrap w-[206px] h-[54px] items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0 bg-[#42cbe6]">
          <div className="relative w-9 h-9" />

          <div className="mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal relative w-fit text-white text-xl text-center tracking-[0] leading-[normal]">
            AJOUTER
            <br />
            JURY
          </div>
        </div>

        <div className="absolute top-[18px] left-[15px] w-[30px] h-3.5 flex">
          <div className="mt-0.5 w-2.5 h-2.5 flex">
            <div className="flex-1 w-2.5 relative">
              <div className="absolute w-[140.00%] h-[140.00%] top-[-20.00%] left-[-20.00%] rounded-[7px] border-2 border-solid border-black -rotate-45" />

              <div className="absolute w-[72.50%] h-[10.98%] top-[46.79%] left-[14.44%] bg-black" />

              <div className="absolute w-[72.50%] h-[10.98%] top-[46.79%] left-[14.43%] bg-black rotate-[90.00deg]" />
            </div>
          </div>

          <div className="w-[19.97px] h-[13.97px] bg-[url(/icon-2.svg)] bg-[100%_100%]" />
        </div>
      </div>

      <div className="absolute top-[299px] left-8 w-[206px] h-[54px]">
        <div className="flex flex-wrap w-[206px] h-[54px] items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0 bg-[#42cbe6]">
          <div className="relative w-9 h-9" />

          <div className="mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal relative w-fit text-white text-xl text-center tracking-[0] leading-[normal]">
            OPTIONS
            <br />
            EMAIL
          </div>
        </div>

        <div className="absolute top-3.5 left-[13px] w-8 h-[26px] bg-[url(/icon-3.svg)] bg-[100%_100%]" />
      </div>

      <div className="absolute top-[500px] left-8 w-[206px] h-[54px]">
        <div className="flex flex-wrap w-[206px] h-[54px] items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0 bg-[#42cbe6]">
          <div className="relative w-9 h-9" />

          <div className="mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal relative w-fit text-white text-xl text-center tracking-[0] leading-[normal]">
            MODIFIER
            <br />
            LE SITE
          </div>
        </div>

        <img
          className="absolute top-[11px] left-[13px] w-8 h-8 object-contain"
          alt="Settings icon"
          src={panelIconSetting}
        />
      </div>

      <div className="absolute top-60 left-[30px] w-52 h-[42px]">
        <div className="w-52 h-[42px] bg-[#42cbe6] flex flex-wrap items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0">
          <div className="relative w-9 h-9" />

          <div className="relative flex items-center justify-center w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            VOIR VIDEOS
          </div>
        </div>

        <div className="absolute top-[13px] left-[18px] w-5 h-4 bg-[url(/icon-4.svg)] bg-[100%_100%]" />
      </div>

      <div className="absolute top-[110px] left-[46px] w-40 h-[42px]">
        <div className="w-40 h-[42px] rounded-[50px] bg-[linear-gradient(90deg,rgba(253,255,107,1)_0%,rgba(213,139,82,1)_100%)] flex flex-wrap items-center gap-[5px_5px] px-[15px] py-[3px] absolute top-0 left-0">
          <div className="relative w-9 h-9" />

          <div className="flex items-center justify-center [font-family:'Inter-Bold',Helvetica] font-bold whitespace-nowrap relative w-fit text-white text-xl text-center tracking-[0] leading-[normal]">
            ACCUEIL
          </div>
        </div>

        <img
          className="absolute top-1 left-4 w-[29px] h-[29px] object-contain"
          alt="Home icon"
          src={panelIconHome}
        />
      </div>

      <div className="absolute top-[41px] left-[263px] w-[33px] h-[42px] bg-[#42cbe6]">
        <div className="relative w-[54.55%] h-[42.86%] top-[28.57%] left-[18.18%]">
          <div className="absolute w-[120.66%] h-[20.76%] top-[39.62%] left-[-10.33%] bg-[#2b9498] -rotate-45" />

          <div className="absolute w-[120.66%] h-[20.76%] top-[39.62%] left-[-10.33%] bg-[#2b9498] rotate-[-135deg]" />
        </div>
      </div>
    </div>
  );
};
