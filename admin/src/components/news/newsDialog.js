import React from 'react'
import {
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from '@material-tailwind/react';
export default function NewsDialog(open, handleOpen, newDialogdata, setEditName, loading, uploadState) {
  return (
    <div>
      {' '}
      <Dialog open={ open} handler={handleOpen}>
        <DialogHeader>Edit Category.</DialogHeader>
        <DialogBody>
          <div
            className='w-full max-w-md p-8 bg-white rounded-lg shadow-sm'
            Name>
            <h1 className='mb-4 text-lg font-semibold' Name>
              Update this News Type
            </h1>
            <p className='mb-6 text-sm text-gray-600' Name>
              this category will be associated to your product when created.
            </p>
            <div className='mb-4' Name>
              <input
                type='text'
                placeholder='write here...'
                value={newDialogdata && newDialogdata?.editname}
                className='w-full px-4 py-2 text-gray-700 border rounded-lg email-input focus:border-blue-500'
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className='flex flex-row justify-between w-full mt-10'>
            {!loading && <div className=''></div>}

            <div className='flex flex-row items-center gap-4 ml-5'>
              {loading && <Spinner />}
              <span className='text-sm'> {uploadState}</span>
            </div>

            <div className=''>
              <Button
                variant='text'
                color='red'
                onClick={() => handleOpen(null)}
                className='mr-1'>
                <span>Cancel</span>
              </Button>
              <Button
                variant='gradient'
                onClick={() => {
                  let id = item._id;
                  handleEdit(id);
                }}
                disabled={!newDialogdata && newDialogdata?.editname}
                className={`${
                  !newDialogdata && newDialogdata?.editname
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}>
                <span>Upload</span>
              </Button>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
