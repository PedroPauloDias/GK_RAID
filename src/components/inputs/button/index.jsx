import React from "react";
import {Button} from "@nextui-org/react";

export default function ButtonCustom({children}) {
  return (
    <div className="flex gap-4 items-center">

      <Button size="md">
        
        {children}
      </Button>  
     
    </div>
  );
}
