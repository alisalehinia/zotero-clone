import { useAttachmentContext } from '@/context/AttachmentContext'
import { Box } from '@mui/material'
import React from 'react'
import { AttachmentContainer } from 'styles/body'

const MiddleContainerComponent = () => {
    const { attachments } = useAttachmentContext();
    console.log(attachments);
    return (
        <>
            {
                attachments.map((attachment, index) => {
                    const isOdd = (index + 1) % 2 === 1;
                    const backgroundColor = isOdd ? '#94a3b8' : '#64748b';

                    return <AttachmentContainer key={attachment._id} sx={{ backgroundColor: backgroundColor }}>
                        <Box>{attachment.name}</Box>
                        <Box>{attachment._id}</Box>
                        <Box>3</Box>
                    </AttachmentContainer>
                })
            }
        </>
    )
}

export default MiddleContainerComponent