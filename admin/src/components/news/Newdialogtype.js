import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
  IconButton,
  Tooltip,
  Button,
  Dialog as Dialogs,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from '@material-tailwind/react';
export default function NewsDialogType({
  isOpen,
  closeModal,
  newDialogdata,
  setEditName,
  loading,
  uploadState,
  handleEdit,
}) {

  console.log('newDialogdata', newDialogdata);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[999]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 backdrop-blur-sm   bg-black bg-opacity-40' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 pl-3 text-gray-900'>
                    Edit Category.
                  </Dialog.Title>
                  <div>
                    <DialogBody>
                      <div
                        className='w-full max-w-md  bg-white rounded-lg shadow-sm'
                        Name>
                        <h1 className='mb-4 text-lg font-semibold' Name>
                          Update this News Type
                        </h1>
                        <p className='mb-6 text-sm text-gray-600' Name>
                          this category will be associated to your product when
                          created.
                        </p>
                        <div className='mb-4' Name>
                          <input
                            type='text'
                            placeholder='write here...'
                            defaultValue={newDialogdata && newDialogdata?.name}
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
                            onClick={closeModal}
                            className='mr-1'>
                            <span>Cancel</span>
                          </Button>
                          <Button
                            variant='gradient'
                            type='submit'
                            onClick={() => {
                              handleEdit(newDialogdata &&  newDialogdata?.id);
                            }}
                            disabled={!newDialogdata && newDialogdata?.name}
                            className={`${
                              !newDialogdata && newDialogdata?.name
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}>
                            <span>Upload</span>
                          </Button>
                        </div>
                      </div>
                    </DialogFooter>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
