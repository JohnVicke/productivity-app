import React from 'react'
import { Button } from 'ui'

export const HelloWorld: React.FC = () => (
  <>
    <h1>Hello World</h1>
    <label htmlFor="name">
      <input type="text" id="name" name="name" />
    </label>
    <Button />
  </>
)
