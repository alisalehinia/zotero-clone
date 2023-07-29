import { useAttachmentContext } from '@/context/AttachmentContext'
import { Box } from '@mui/material'
import React from 'react'
import { AttachmentContainer } from 'styles/body'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import http from 'services/httpService';
import { saveAs } from 'file-saver';
import axios from 'axios';

const MiddleContainerComponent = () => {
    const { attachments } = useAttachmentContext();
    console.log(attachments);

    const downloadFile = async (id, name) => {
        try {
            const res = await http.get(`/attachments/${id}/file`, { responseType: 'blob' });
            // Check if the response is successful and has the file data
            if (res && res.data) {
                // Save the file using FileSaver.js
                saveAs(res.data, name);

                // Optionally, display the file in the browser (if supported)
                const fileUrl = URL.createObjectURL(res.data);
                window.open(fileUrl, '_blank'); // Opens the file in a new tab or window
            } else {
                console.log('File not found or response error.');
            }
        } catch (error) {
            console.log('Error downloading the file:', error);
        }
    };

    return (
        <>
            {
                attachments.map((attachment, index) => {
                    // const isOdd = (index + 1) % 2 === 1;
                    // const backgroundColor = isOdd ? '#94a3b8' : '#64748b';
                    // sx={{ backgroundColor: backgroundColor }}
                    return <AttachmentContainer key={attachment._id}  >
                        <Box>{attachment.name}</Box>
                        <Box><FileDownloadIcon onClick={() => downloadFile(attachment._id, attachment.name)} /></Box>
                    </AttachmentContainer>
                })
            }
        </>
    )
}

export default MiddleContainerComponent