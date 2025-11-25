'use client';

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-6">
          Create Powerful <span className="text-primary">Diagnostics</span>
        </h1>
        <p className="text-xl text-default-500 max-w-2xl mb-10 mx-auto">
          Build engaging quizzes, assessments, and diagnostic tools in minutes.
          Share them with the world and gain insights.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            as={Link}
            href="/create"
            color="primary"
            size="lg"
            variant="shadow"
            className="font-semibold"
          >
            Start Creating
          </Button>
          <Button
            as={Link}
            href="/diagnostics"
            variant="bordered"
            size="lg"
            className="font-semibold"
          >
            Explore Diagnostics
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
