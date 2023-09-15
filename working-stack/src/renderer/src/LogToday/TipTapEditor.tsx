import './styles.scss'

import Highlight from '@tiptap/extension-highlight'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'

import PlaceHolder from '@tiptap/extension-placeholder'

import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
  createDocument,
  useEditor
} from '@tiptap/react'
import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import { EditorState } from 'prosemirror-state'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import React, { Dispatch, useEffect, useState } from 'react'
import MenuBar from './Menu'

const extensions = [
  //   StarterKit,
  Document,
  Paragraph,
  Text,
  Highlight.configure({ multicolor: true }),
  History.configure({ newGroupDelay: 500 }),
  Bold.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-b': () => this.editor.chain().focus().toggleBold().run()
      }
    }
  }),
  Italic.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-i': () => this.editor.chain().focus().setItalic().focus('end').toggleItalic().run()
      }
    }
  }),
  Strike,

  BulletList.configure({
    itemTypeName: 'listItem'
  }),
  OrderedList,
  Blockquote,
  ListItem,
  PlaceHolder
]

export default function TipTapEditor({ _content, setLogContentState, readOnly }) {
  console.log('Tip Tap editor', _content)
  let [contentState, setContentState] = useState(_content)

  let editor = useEditor({
    extensions: extensions,
    content: _content,
    onUpdate({ editor }) {
      console.log('updated', editor.getHTML())
      setContentState(editor.getHTML())
      setLogContentState(editor.getHTML())
      //   setLogContentState(editor)
    }
  })

  useEffect(() => {
    console.log('useEffect')
    if (editor) {
      console.log(editor)
      const newState = EditorState.create({
        doc: createDocument(_content, editor.schema),
        schema: editor.schema,
        plugins: editor.state.plugins
      })
      editor.view.updateState(newState)

      editor.commands.setContent(_content)
      editor.setEditable(!readOnly)
    }
    console.log('setLogContentText inside tiptapeditor', _content)
  }, [_content, readOnly])

  return (
    <div
      className="tiptap-editor"
      onClick={() => {
        if (!editor?.isFocused) editor?.commands.focus('end')
        console.log('TipTapEditor click event')
      }}
    >
      <MenuBar editor={editor} readOnly={readOnly} />
      <EditorContent editor={editor} />
    </div>
  )
}
