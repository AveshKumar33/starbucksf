import React from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import theme from "../../../theme/theme";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const Addeditterm: React.FC = () => {
    // const [initialValue, setInitialValue] = useState('');
    // const handleEditorChange = (event: any, editor: any) => {
        
    //     const editorData = editor.getData();
        
    //     setInitialValue(editorData);
        
    // };
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{dsiplay:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%' , backgroundColor:'#F0F6FE'}}>
           <Box sx={{display:'flex', alignItems:'center', justifyContent:"space-between", px:'32px', py:'14px',backgroundColor:"#fff",}}>
             <Typography variant="subtitle1" sx={{fontWeight:'500', color:'#1F1F1F'}}>
             Edit Terms & Conditions
             </Typography>
            <Box>
            <Button  sx={{ bgcolor: "#008DF1", gap: "10px", boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);", borderRadius: "4px", marginRight:'12px' }} variant="contained">Save</Button>
            <Button variant="outlined" sx={{  height:'36px',textTransform:'initial' }} >Cancel</Button>
            </Box>
            </Box>
          <Box className="text_editor" sx={{width:'70%', backgroundColor:"#fff", borderRadius:'10px' , padding:'32px',  mx:"auto", marginTop:'14px' }}>
              {/* <CKEditor
                    data={initialValue}
                    onChange={handleEditorChange}
                    editor={ClassicEditor}
                  /> */}
          </Box>

            </Box>
        </ThemeProvider>
    )
}