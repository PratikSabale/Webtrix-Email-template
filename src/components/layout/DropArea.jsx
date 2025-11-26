import { Box, Typography } from "@mui/material";
import { DownloadSimple } from "phosphor-react";
import React from "react";
import DropBox from "./DropBox";
import { droppedItemsState } from "../../state/dnd/dndState";
import { useRecoilState } from "recoil";


const DropAreas = () => {
    const [items, setItems] = useRecoilState(droppedItemsState);
    const handleDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        // copy instead of move
        const newItem = {
            ...data,
            instanceId: Date.now(), // unique copy ID
            position: { x: 100, y: 100 }, // default position
        };

        setItems((prev) => [...prev, newItem]);
    };


    return (

        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              width:"50%",
                background: "#f5f5f5",
                padding: 20,
            
            }}
        >
            <h3>Dropped Items</h3>

            {items.map((item) => (
                <div
                    key={item.instanceId}
                    style={{
                        padding: 15,
                        background: "white",
                        marginTop: 10,
                        borderRadius: 8,
                    }}
                >
                    {item.label} (copy)
                </div>
            ))}
        </div>

        // <Box
        //     sx={{
        //         display: "flex",
        //         flexDirection: "column",
        //         gap: 3,
        //         backgroundColor: "#fff",   // white background
        //          p: 3 ,   // responsive padding
        //           width: "100%",
        // maxWidth: 700,
        // mx: "auto",
        //     }}
        // >
        //         {/* Row 1  */}

        //     <Box sx={{ display: "flex", gap: 2,width:"100%" }}>
        //         <Box sx={{width:{
        //             xs:"35%",
        //             sm:"35%",
        //             md:231,
        //         }}}>
        //             <DropBox height={120} />
        //         </Box>

        //         <Box sx={{width:{
        //             xs:"65%",
        //             sm:"65%",
        //             md:452,
        //         }}}>
        //             <DropBox height={120} />
        //         </Box>
        //     </Box>

        //                    {/* ROW 2 */}
        //     <DropBox height={150} />

        //      {/* ROW 3 */}

        //     <Box sx={{ display: "flex", gap: 2,width:"100%",}}>
        //         <Box sx={{ display: "flex", }}>
        //             <Box sx={{width:{xs:"100%",sm:"100%",md:335}}}>
        //                 <DropBox height={1} />
        //             </Box>
        //         </Box>

        //         <Box sx={{ display: "flex", }}>
        //             <Box sx={{width:{xs:"100%",sm:"100%",md:351,}}}>
        //                 <DropBox height={140} />
        //             </Box>
        //         </Box>
        //     </Box>
        // </Box>
    );
};

export default DropAreas;
