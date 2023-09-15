import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} toggleVisibility={mockHandler}/>)

  const titleAuthorElement = screen.queryAllByText('test title test author')
  expect(titleAuthorElement).not.toHaveLength(0)
/*
  const urlElement = screen.queryAllByText('test url')
  expect(urlElement).toHaveLength(0)

  const likesElement = screen.queryAllByText('likes 0')
  expect(likesElement).toHaveLength(0)*/
})
