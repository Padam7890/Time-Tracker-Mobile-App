import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FormikHandlers, FormikValues } from "formik";

interface Props {
  values: FormikValues;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  handleChange: FormikHandlers["handleChange"];
  data: { value: string; label: string }[];
}
const DropDown = ({ values, handleChange, errors, touched, data }: Props) => {
  return (
    <View>
      <Text className="text-gray-700 mb-1">Priority</Text>
      <Dropdown
        data={data}
        value={values.taskpriority}
        labelField="label"
        valueField="value"
        onChange={(item) => handleChange("taskpriority")(item.value)}
      />
      {errors?.taskpriority && touched.taskpriority && (
        <Text className="text-red-500 mt-1">{errors?.taskpriority}</Text>
      )}
    </View>
  );
};

export default DropDown;
