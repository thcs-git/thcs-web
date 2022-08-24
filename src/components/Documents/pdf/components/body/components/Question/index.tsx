import React, { ReactChild, ReactChildren, ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

interface AuxProps {
  children: ReactNode;
}

export default function PDFQuestion({ children }: AuxProps) {
  return (
    <View style={styles.question} wrap>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    display: "flex",
    marginBottom: 20,
  },
});
