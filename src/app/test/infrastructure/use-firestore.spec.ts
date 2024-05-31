/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  where,
  query,
  CollectionReference,
  Firestore,
  QueryFieldFilterConstraint,
  Query,
  getDoc,
  doc,
  DocumentReference,
} from "firebase/firestore";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

describe("useFirestore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addDocument", () => {
    test("add document", () => {
      // empty logics, because void simple logic.
    });
  });

  describe("getDocument", () => {
    const mockCollection = {} as CollectionReference;
    const mockFirestore = {} as Firestore;
    const mockDocs = {
      docs: [{ data: () => ({ key1: "value1" }) }],
    };
    const mockWhere = {} as QueryFieldFilterConstraint;
    const mockQuery = {} as Query;

    beforeEach(() => {
      (initializeApp as jest.Mock).mockReturnValue({});
      (collection as jest.Mock).mockReturnValue(mockCollection);
      (getFirestore as jest.Mock).mockReturnValue(mockFirestore);
      (getDocs as jest.Mock).mockResolvedValue(mockDocs);
      (where as jest.Mock).mockReturnValue(mockWhere);
      (query as jest.Mock).mockReturnValue(mockQuery);
    });

    test("should call by single query", async () => {
      const { getDocument } = useFirestore();

      await getDocument("testCollection", ["key1 == value1"]);

      expect(collection).toHaveBeenCalledWith(mockFirestore, "testCollection");
      expect(where).toHaveBeenCalledWith("key1", "==", "value1");
      expect(query).toHaveBeenCalledWith(mockCollection, mockWhere);
      expect(getDocs).toHaveBeenCalledWith(mockQuery);
    });

    test("should call by multiple queries", async () => {
      const { getDocument } = useFirestore();

      await getDocument("testCollection", ["key1 < value1", "key2 > value2"]);

      expect(collection).toHaveBeenCalledWith(mockFirestore, "testCollection");
      expect(where).toHaveBeenCalledWith("key1", "<", "value1");
      expect(where).toHaveBeenCalledWith("key2", ">", "value2");
      expect(query).toHaveBeenCalledWith(mockCollection, mockWhere, mockWhere);
      expect(getDocs).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe("getDocumenByDocNo", () => {
    const mockFirestore = {} as Firestore;
    const mockDoc = {} as DocumentReference;
    const mockGetDoc = {
      data: () => ({ key1: "value1" }),
    };

    beforeEach(() => {
      (initializeApp as jest.Mock).mockReturnValue({});
      (getFirestore as jest.Mock).mockReturnValue(mockFirestore);
      (doc as jest.Mock).mockReturnValue(mockDoc);
      (getDoc as jest.Mock).mockResolvedValue(mockGetDoc);
    });

    test("success getDocumentByDocNo", async () => {
      const { getDocumentByDocNo } = useFirestore();

      await getDocumentByDocNo("testCollection", "test-uid");

      expect(doc).toHaveBeenCalledWith(mockFirestore, "testCollection", "test-uid");
      expect(getDoc).toHaveBeenCalledWith(mockDoc);
    });
  });
});
