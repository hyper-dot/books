"use client";
import Link from "next/link";
import { FormErr } from "@/components/form/FormErr";
import Logo from "@/components/common/Logo";
import FormSubmitBtn from "@/components/form/FormSubmitBtn";
import { BackBtn } from "@/components/common/BackBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2 } from "@/components/ui/typography";

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-4 py-10">
      <div className="fixed left-4 top-4">
        <Logo />
      </div>

      <div className="w-full max-w-sm">
        <BackBtn />
        <H2>Hi there,</H2>
      </div>
      <form className="w-full max-w-sm space-y-4">
        <div>
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Enter your full name here" />
            <FormErr></FormErr>
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <Input placeholder="Enter your email here" />
          <FormErr></FormErr>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="Enter a strong password" />
          <FormErr></FormErr>
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" placeholder="Confirm your password" />
          <FormErr></FormErr>
        </div>

        <div className="space-y-2 pt-5">
          <FormSubmitBtn className="w-full" isSubmitting={false}>
            Register
          </FormSubmitBtn>

          <p className="text-center">Or</p>

          <Button
            type="button"
            className="flex w-full gap-2"
            variant="outline"
            disabled={false}
          >
            <img width={20} src="/google.svg" alt="" />
            Continue with Google
          </Button>

          <p className="pt-5 text-center">
            Already have an account ?{" "}
            <Link
              className="text-blue-500 underline-offset-2 hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
