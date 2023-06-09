import { useAttachmentContext } from '@/context/AttachmentContext'
import { Box } from '@mui/material'
import React from 'react'
import { AttachmentContainer } from 'styles/body'

const MiddleContainerComponent = () => {
    const { attachments } = useAttachmentContext();
    return (
        <>
            {
                attachments.map((attachment, index) => {
                    // const isOdd = (index + 1) % 2 === 1;
                    // const backgroundColor = isOdd ? '#94a3b8' : '#64748b';
                    // sx={{ backgroundColor: backgroundColor }}
                    return <AttachmentContainer key={attachment._id} >
                        <Box>{attachment.name}</Box>
                        <Box>{attachment._id}</Box>
                    </AttachmentContainer>
                })
            }
        </>
    )
}

export default MiddleContainerComponent