import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  shortUrl: string;
}

const QRCodeModal = ({
  isOpen,
  onClose,
  qrCode,
  shortUrl,
}: QRCodeModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  QR Code for {shortUrl}
                </Dialog.Title>
                <div className="mt-4 flex justify-center">
                  <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = qrCode;
                      link.download = "qr-code.png";
                      link.click();
                    }}
                  >
                    Download QR Code
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QRCodeModal;
