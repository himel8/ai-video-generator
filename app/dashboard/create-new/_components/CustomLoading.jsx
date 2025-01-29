import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="mt-6">
          <p className="text-center my-3">
            Generating your video... Do not Refresh
          </p>
          {/* <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div> */}
          {/* <p className="text-center mt-2 text-blue-500">{progress}%</p> */}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
