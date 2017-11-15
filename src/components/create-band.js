import React from 'react'

const CreateBand = ({ createdId, create }) => (
  <div>
    <button onClick={create}>Create</button><br />
    { createdId &&
      <a href={ createdId }>Created</a>
    }
  </div>
)

export default CreateBand
