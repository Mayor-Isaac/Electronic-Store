import React from "react";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import formatCurrency from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  watermark: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.08,
  },
  watermarkImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#6b7280",
  },
  imageSection: {
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",

    marginBottom: 18,
    paddingBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  infoItem: {
    width: "48%",
    marginBottom: 4,
  },
  label: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111827",
    color: "#ffffff",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  colSN: {
    width: 28,
    minWidth: 28,
    maxWidth: 28,
    textAlign: "center",
    flexShrink: 0,
  },
  colProduct: { flexGrow: 1, flexShrink: 1, paddingRight: 4 },
  colQty: { width: 36, minWidth: 36, maxWidth: 36, flexShrink: 0 },
  colPrice: { width: 72, minWidth: 72, maxWidth: 72, flexShrink: 0 },
  colTotal: { width: 72, minWidth: 72, flexShrink: 0 },
  summary: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "flex-end",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 700,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 700,
  },
});

export default function SalesReceipt({ receiptData }) {
  if (!receiptData) {
    return null;
  }

  const {
    salesRecord,
    items = [],
    customerName,
    paymentMethod,
    grandTotal,
  } = receiptData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.watermark}>
          <Image src="/assets/logo.jpg" style={styles.watermarkImage} />
        </View>

        <View style={styles.imageSection}>
          <Image src="/assets/logo.jpg" style={{width: 80, height: 60}} />
          <View style={styles.header}>
            <Text style={styles.title}>Component Receipt</Text>
            <Text style={styles.subtitle}>
              Sale receipt generated from the POS system
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.metaRow}>
            <Text>Receipt No: {salesRecord?.id.slice(0,13) ?? "-"}</Text>
            <Text>
              {formatDate(salesRecord?.created_at ?? new Date().toISOString())}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Customer Name</Text>
              <Text style={styles.value}>
                {customerName || "Walk-in Customer"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>{paymentMethod || "-"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.colSN}>S/N</Text>
            <Text style={styles.colProduct}>Product</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Unit Price</Text>
            <Text style={styles.colTotal}>Line Total</Text>
          </View>

          {items.map((item, index) => {
            const lineTotal =
              Number(item.quantity) * Number(item.unit_price_at_sale);

            return (
              <View key={`${item.product_id}-${index}`} style={styles.tableRow}>
                <Text style={styles.colSN}>{index + 1}</Text>
                <Text style={styles.colProduct}>
                  {item.name || item.product_name || `Item ${index + 1}`}
                </Text>
                <Text style={styles.colQty}>{Number(item.quantity) || 0}</Text>
                <Text style={styles.colPrice}>
                  {item.unit_price_at_sale || 0}
                </Text>
                <Text style={styles.colTotal}>
                  {formatCurrency(lineTotal || 0)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(grandTotal || 0)}
            </Text>
          </View>
          {/* <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Receipt ID</Text>
            <Text style={styles.totalValue}>{salesRecord?.id ?? '-'}</Text>
          </View> */}
        </View>
      </Page>
    </Document>
  );
}
